export const CONTACT_REASONS = [
  { value: "general", label: "General question" },
  { value: "bulk-wholesale", label: "Bulk / wholesale order" },
  { value: "event-catering", label: "Event or catering" },
  { value: "feedback", label: "Feedback" },
  { value: "press", label: "Press / media" },
  { value: "other", label: "Something else" },
] as const;

export type ContactReason = (typeof CONTACT_REASONS)[number]["value"];
