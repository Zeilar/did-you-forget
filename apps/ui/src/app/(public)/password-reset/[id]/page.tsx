import { Form } from "./Form";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  return <Form id={(await params).id} />;
}
