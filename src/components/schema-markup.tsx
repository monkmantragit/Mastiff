/**
 * JSON-LD output. "<" is escaped so CMS text containing "</script>" cannot close the tag
 * early and break the page (or inject markup).
 */
export default function SchemaMarkup({ schema }: { schema: unknown }) {
  const schemas = (Array.isArray(schema) ? schema : [schema]).filter(Boolean);

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
