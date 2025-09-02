export default function SchemaMarkup({ schema }: { schema: any | any[] }) {
  const schemas = Array.isArray(schema) ? schema : [schema];
  
  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}