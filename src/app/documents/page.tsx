import type { Metadata } from "next";

import { DocumentsPage } from "@/components/documents/DocumentsPage";
import { documentsContent } from "@/content/documents";

export const metadata: Metadata =
  documentsContent.metadata;

export default function Page() {
  return <DocumentsPage />;
}
