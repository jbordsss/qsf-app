import { fetchArticleContent } from "@/lib/data"
import { QuantumTerm } from "@/components/quantum-term"
import { findQuantumTermsInText } from "@/lib/quantum-terms"

interface ArticleContentProps {
  slug: string
}

export async function ArticleContent({ slug }: ArticleContentProps) {
  const content = await fetchArticleContent(slug)

  // Find quantum terms in the content
  const termsInContent = findQuantumTermsInText(content)

  // Process content to highlight quantum terms
  const processedContent = content
  if (termsInContent.length > 0) {
    // Create a React component from the HTML content with highlighted terms
    return (
      <div>
        {content.split(/\n\n|\r\n\r\n/).map((paragraph, index) => {
          let processedParagraph = paragraph

          // Replace terms with QuantumTerm components
          termsInContent.forEach((termDef) => {
            const regex = new RegExp(`\\b(${termDef.term})\\b`, "gi")
            if (regex.test(processedParagraph)) {
              // We'll use a placeholder to mark where to insert the QuantumTerm
              processedParagraph = processedParagraph.replace(regex, `__QUANTUM_TERM_${termDef.term}__`)
            }
          })

          // If no terms were found, just return the paragraph as HTML
          if (!processedParagraph.includes("__QUANTUM_TERM_")) {
            return <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
          }

          // Split by placeholders and reconstruct with QuantumTerm components
          const parts = processedParagraph.split(/__QUANTUM_TERM_([^_]+)__/g)

          return (
            <div key={index}>
              {parts.map((part, partIndex) => {
                // Even indices are regular text, odd indices are term names
                if (partIndex % 2 === 0) {
                  return <span key={partIndex} dangerouslySetInnerHTML={{ __html: part }} />
                } else {
                  const termDef = termsInContent.find((t) => t.term.toLowerCase() === part.toLowerCase())
                  if (termDef) {
                    return <QuantumTerm key={partIndex} term={part} definition={termDef.definition} />
                  }
                  return part
                }
              })}
            </div>
          )
        })}
      </div>
    )
  }

  // If no terms found, just render the content as HTML
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}
