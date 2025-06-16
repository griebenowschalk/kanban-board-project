import { Container } from "@/components/ui/container"
import { Header } from "@/components/header"
import { Board } from "@/components/features/kanban/board"

const sampleTasks = [
  {
    id: "1",
    title: "Design new dashboard",
    description: "Create wireframes and mockups for the new dashboard",
    status: "todo" as const,
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up NextAuth.js with Google provider",
    status: "in-progress" as const,
  },
  {
    id: "3",
    title: "Setup project structure",
    description: "Initialize Next.js project with TypeScript",
    status: "done" as const,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Container className="py-8 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Welcome to Kanban Board
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              A modern task management application built with Next.js and shadcn/ui.
            </p>
          </div>
          <div className="mt-8">
            <Board tasks={sampleTasks} />
          </div>
        </Container>
      </main>
    </div>
  )
}
