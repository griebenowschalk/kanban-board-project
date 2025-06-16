import { Container } from "@/components/ui/container"
import { Header } from "@/components/header"
import { Board } from "@/components/features/kanban/board"

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
            <Board />
          </div>
        </Container>
      </main>
    </div>
  )
}
