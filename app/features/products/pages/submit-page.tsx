import type { Route } from "~/types";
import { Form, type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Product | wemake" },
    {
      name: "description",
      content: "Submit your product to our community",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  // 실제로는 여기서 제품 제출 처리를 해야 합니다
  return {};
}

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <div className="container py-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold">Submit Your Product</h1>
      <p className="mt-4 text-gray-600">
        Share your creation with the We Make community
      </p>

      <Form method="post" className="mt-8 space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="block font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select a category</option>
            <option value="productivity">Productivity</option>
            <option value="developer-tools">Developer Tools</option>
            <option value="design-tools">Design Tools</option>
            <option value="ai-ml">AI & Machine Learning</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="website" className="block font-medium">
            Website URL
          </label>
          <input
            type="url"
            id="website"
            name="website"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white font-medium rounded-lg"
        >
          Submit Product
        </button>
      </Form>
    </div>
  );
}
