import type { Route } from "~/types";
import { type MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Promote Your Product | wemake" },
    {
      name: "description",
      content: "Promote your product with our promotion plans",
    },
  ];
};

export function loader({ request }: Route.LoaderArgs) {
  return {};
}

export function action({ request }: Route.ActionArgs) {
  return {};
}

export default function PromotePage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const promotionPlans = [
    {
      name: "Basic",
      price: "$49",
      features: [
        "Featured on homepage for 24 hours",
        "Social media promotion",
        "Newsletter mention",
      ],
    },
    {
      name: "Premium",
      price: "$99",
      features: [
        "Featured on homepage for 72 hours",
        "Social media promotion",
        "Newsletter mention",
        "Featured in weekly digest",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Custom promotion duration",
        "Dedicated social media campaign",
        "Featured interview",
        "Custom marketing strategy",
        "Priority support",
        "Analytics dashboard",
      ],
    },
  ];

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold text-center">Promote Your Product</h1>
      <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
        Get more visibility for your product with our promotion plans. Choose
        the plan that best fits your needs.
      </p>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {promotionPlans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded-lg p-6 space-y-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="text-3xl font-bold text-blue-500">{plan.price}</p>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 mt-4 bg-blue-500 text-white font-medium rounded-lg">
              Choose {plan.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
