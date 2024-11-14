"use client";

export default function Page(props: unknown) {
  return (
    <div>
      <h1>Oops</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
