export interface QuantumTermDefinition {
  term: string
  definition: string
}

export const quantumTerms: QuantumTermDefinition[] = [
  {
    term: "qubit",
    definition:
      "The fundamental unit of quantum information, analogous to a classical bit but can exist in superposition states.",
  },
  {
    term: "superposition",
    definition:
      "A quantum mechanical property where a particle exists in multiple states simultaneously until measured.",
  },
  {
    term: "entanglement",
    definition:
      "A quantum phenomenon where particles become correlated in such a way that the quantum state of each particle cannot be described independently.",
  },
  {
    term: "quantum supremacy",
    definition:
      "The demonstration that a programmable quantum device can solve a problem that no classical computer can solve in any feasible amount of time.",
  },
  {
    term: "quantum teleportation",
    definition:
      "A process by which quantum information can be transmitted from one location to another, with the help of classical communication and previously shared quantum entanglement.",
  },
  {
    term: "quantum cryptography",
    definition:
      "The science of exploiting quantum mechanical properties to perform cryptographic tasks that are impossible using classical systems.",
  },
  {
    term: "quantum annealing",
    definition:
      "A metaheuristic for finding the global minimum of a given objective function over a given set of candidate solutions, using quantum fluctuations.",
  },
  {
    term: "quantum gate",
    definition:
      "A basic quantum circuit operating on a small number of qubits, building blocks of quantum circuits like classical logic gates are for conventional digital circuits.",
  },
  {
    term: "quantum error correction",
    definition:
      "A technique used to protect quantum information from errors due to decoherence and other quantum noise.",
  },
  {
    term: "quantum coherence",
    definition:
      "The ability of a quantum system to maintain a defined phase relationship between different states, essential for quantum computing.",
  },
]

export function getRandomQuantumTerms(count = 3): QuantumTermDefinition[] {
  const shuffled = [...quantumTerms].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function findQuantumTermsInText(text: string): QuantumTermDefinition[] {
  const foundTerms: QuantumTermDefinition[] = []

  quantumTerms.forEach((termDef) => {
    const regex = new RegExp(`\\b${termDef.term}\\b`, "i")
    if (regex.test(text)) {
      foundTerms.push(termDef)
    }
  })

  return foundTerms
}
