import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import React from "react"

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  text_className?: string
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  text_className,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const wrapped = extractWordsWithBreaks(children)

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent">
        <div className={cn("text-muted-foreground", text_className)}>
          {wrapped.map((item, i) => {
            if (item.type === "br")
              return <div key={`br-${i}`} className="w-full h-6" />

            if (item.type === "paragraph-start")
              return <div key={`pstart-${i}`} className="w-full" />

            if (item.type === "word") {
              const start = item.index / item.total
              const end = start + 1 / item.total

              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  className={item.className}
                >
                  {item.value}
                </Word>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Extraction robuste avec propagation de className */
/* ------------------------------------------------------------------ */

function extractWordsWithBreaks(node: ReactNode) {
  const words: {
    type: "word" | "br" | "paragraph-start"
    value?: string
    index?: number
    total?: number
    className?: string
  }[] = []

  // Stack des className parents
  const classStack: string[] = []

  function walk(n: ReactNode) {
    if (n == null) return

    if (typeof n === "string") {
      const parts = n.split(/(\s+)/)
      const activeClass = classStack.join(" ")

      parts.forEach((p) => {
        if (p.trim().length > 0) {
          words.push({
            type: "word",
            value: p,
            className: activeClass,
          })
        }
      })
      return
    }

    if (Array.isArray(n)) {
      n.forEach(walk)
      return
    }

    if (React.isValidElement(n)) {
      const tag = typeof n.type === "string" ? n.type : undefined

      // push className du parent dans la stack
      if (n.props.className) classStack.push(n.props.className)

      if (tag === "br") {
        words.push({ type: "br" })
        if (n.props.className) classStack.pop()
        return
      }

      if (tag === "p") {
        words.push({ type: "paragraph-start" })
      }

      walk(n.props.children)

      // pop après avoir exploré l'arbre
      if (n.props.className) classStack.pop()
    }
  }

  walk(node)

  const totalWords = words.filter((w) => w.type === "word").length
  let idx = 0

  return words.map((w) => {
    if (w.type !== "word") return w
    return { ...w, index: idx++, total: totalWords }
  })
}

/* ------------------------------------------------------------------ */
/* Word */
/* ------------------------------------------------------------------ */

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
  className?: string
}

const Word: FC<WordProps> = ({ children, progress, range, className }) => {
  const opacity = useTransform(progress, range, [0, 1])

  return (
    <span className="relative mx-1 lg:mx-1.5 inline-block">
      <span className={cn("absolute opacity-30", className)}>{children}</span>
      <motion.span style={{ opacity }} className={cn("text-foreground", className)}>
        {children}
      </motion.span>
    </span>
  )
}
