'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { ResultPanel } from '@/components/site/landing'
import { selectProduct } from '@/components/home/select-product'

/** Each "yes" adds weight; the measurement tag tells sales what the study should focus on. */
const questions = [
  { id: 'burn', text: '¿Se te han quemado tarjetas, fuentes o compresores en el último año?', weight: 3, measure: 'transitorios' },
  { id: 'trip', text: '¿Se botan pastillas o interruptores sin razón aparente?', weight: 2, measure: 'sobrecarga y desbalance' },
  { id: 'flicker', text: '¿Parpadean las luces cuando arranca un aire, bomba o motor?', weight: 2, measure: 'caídas de voltaje' },
  { id: 'heat', text: '¿Hay cables, tableros o transformadores que se calientan?', weight: 3, measure: 'armónicos' },
  { id: 'penalty', text: '¿Tu recibo de CFE trae cargo por bajo factor de potencia?', weight: 2, measure: 'factor de potencia' },
  { id: 'growth', text: '¿Agregaste equipos, aires o maquinaria sin revisar la instalación?', weight: 1, measure: 'capacidad de la instalación' },
] as const

type Answer = 'si' | 'no' | 'nose'

const levels = [
  { min: 7, label: 'Riesgo alto', tone: 'text-red-300', text: 'Tu instalación muestra varias señales de falla. Un estudio te dice exactamente dónde está el problema antes de que dañe más equipo.' },
  { min: 3, label: 'Riesgo medio', tone: 'text-amber-300', text: 'Hay señales que vale la pena medir. Con el estudio sabrás si basta un regulador o si hace falta corregir la instalación.' },
  { min: 0, label: 'Riesgo bajo', tone: 'text-lime-300', text: 'No vemos señales graves. Un estudio sigue siendo útil antes de crecer o invertir en equipo nuevo.' },
]

export function PowerQualityQuiz() {
  const [answers, setAnswers] = useState<Record<string, Answer | undefined>>({})

  const answered = Object.values(answers).filter(Boolean).length
  const score = questions.reduce((sum, q) => sum + (answers[q.id] === 'si' ? q.weight : answers[q.id] === 'nose' ? q.weight / 2 : 0), 0)
  const level = levels.find((item) => score >= item.min) ?? levels[levels.length - 1]
  const focus = questions.filter((q) => answers[q.id] === 'si').map((q) => q.measure)
  const complete = answered === questions.length

  const summary = `${level.label} (${score} pts). Medir: ${focus.length ? focus.join(', ') : 'revisión general'}`

  return (
    <div className="grid gap-4">
      <ol className="grid gap-3">
        {questions.map((q, index) => (
          <li key={q.id} className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm font-bold text-slate-800">
              <span className="mr-2 font-mono text-sky-500">0{index + 1}</span>
              {q.text}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label={q.text}>
              {(['si', 'no', 'nose'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={answers[q.id] === value}
                  onClick={() => setAnswers((current) => ({ ...current, [q.id]: value }))}
                  className={`h-9 rounded-lg border text-xs font-black transition ${answers[q.id] === value ? 'border-sky-500 bg-sky-50 text-sky-700' : 'border-slate-200 text-slate-500 hover:border-sky-200'}`}
                >
                  {value === 'si' ? 'Sí' : value === 'no' ? 'No' : 'No sé'}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <ResultPanel
        label={complete ? 'Tu resultado' : `Respondidas ${answered} de ${questions.length}`}
        value={complete ? level.label : 'Responde las 6 preguntas'}
        detail={
          complete ? (
            <>
              <span className={`font-bold ${level.tone}`}>{focus.length ? `Mediríamos: ${focus.join(', ')}.` : 'Haríamos una revisión general.'}</span>
              <br />
              {level.text}
            </>
          ) : (
            'Al terminar te decimos qué mediríamos en tu instalación.'
          )
        }
      >
        <button
          type="button"
          disabled={!complete}
          onClick={() => selectProduct('calidad', summary)}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl bg-sky-500 font-black text-white transition hover:bg-sky-400 disabled:opacity-50"
        >
          Agendar mi estudio
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </ResultPanel>
    </div>
  )
}
