CREATE OR REPLACE FUNCTION track_event(
    event_type event_type,   -- 이벤트 타입 (예: 'profile_view', 'product_view' 등)
    event_data jsonb         -- 이벤트와 관련된 데이터(JSONB 형식)
) RETURNS void AS $$
DECLARE
    username_var text;          -- event_data에서 추출한 username 저장용 변수
    found_profile_id uuid;      -- 조회된 profile_id 저장용 변수
    found_product_id bigint;    -- 조회된 product_id 저장용 변수
    new_event_data jsonb;       -- username을 제거하고 profile_id를 추가한 새로운 event_data
    safe_product_id bigint;     -- 안전하게 변환된 product_id 저장용 변수
BEGIN
    -- profile_view 이벤트 처리
    IF event_type = 'profile_view' THEN
        username_var := event_data->>'username';  -- event_data에서 username 추출
        IF username_var IS NOT NULL THEN          -- username이 존재하면
            SELECT profile_id INTO found_profile_id 
            FROM public.profiles 
            WHERE username = username_var;        -- username으로 profile_id 조회
            IF found_profile_id IS NOT NULL THEN  -- profile_id가 존재하면
                new_event_data := event_data - 'username';  -- event_data에서 username 제거
                new_event_data := jsonb_set(
                    new_event_data, 
                    '{profile_id}', 
                    to_jsonb(found_profile_id)
                );                                -- profile_id를 event_data에 추가
                INSERT INTO events (event_type, event_data)
                VALUES (event_type, new_event_data); -- events 테이블에 삽입
            END IF;
        END IF;

    -- product_view 또는 product_visit 이벤트 처리
    ELSIF event_type = 'product_view' OR event_type = 'product_visit' THEN
        IF (event_data ? 'product_id') THEN       -- event_data에 product_id가 있으면
            BEGIN
                safe_product_id := (event_data->>'product_id')::bigint; -- product_id를 bigint로 변환
            EXCEPTION WHEN OTHERS THEN
                safe_product_id := null;          -- 변환 실패시 null 할당
            END;
            IF safe_product_id IS NOT NULL THEN   -- 변환된 product_id가 null이 아니면
                SELECT product_id INTO found_product_id 
                FROM public.products 
                WHERE product_id = safe_product_id; -- product_id로 상품 조회
                IF found_product_id IS NOT NULL THEN -- 상품이 존재하면
                    INSERT INTO events (event_type, event_data)
                    VALUES (event_type, event_data); -- events 테이블에 삽입
                END IF;
            END IF;
        END IF;
    END IF;
END;
$$ language plpgsql;
