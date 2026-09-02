import { permanentRedirect } from "next/navigation";

// The actual page content lives at /need-more-leads.
// This permanent redirect preserves the nav hierarchy while keeping content in one place.
export default function SolutionsNeedMoreLeadsPage() {
  permanentRedirect("/need-more-leads");
}
