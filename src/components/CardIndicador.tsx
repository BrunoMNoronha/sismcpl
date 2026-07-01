import { LucideIcon } from 'lucide-react'

interface CardIndicadorProps {
  titulo: string
  valor: number | string
  descricao?: string
  icon: LucideIcon
  cor?: 'emerald' | 'blue' | 'amber' | 'purple' | 'rose'
  tendencia?: 'up' | 'down' | 'neutral'
}

const coresMap = {
  emerald: {
    bg: 'bg-emerald-50',
    icon: 'bg-emerald-600',
    valor: 'text-emerald-700',
    badge: 'bg-emerald-100 text-emerald-600',
  },
  blue: {
    bg: 'bg-blue-50',
    icon: 'bg-blue-600',
    valor: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-600',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'bg-amber-500',
    valor: 'text-amber-700',
    badge: 'bg-amber-100 text-amber-600',
  },
  purple: {
    bg: 'bg-purple-50',
    icon: 'bg-purple-600',
    valor: 'text-purple-700',
    badge: 'bg-purple-100 text-purple-600',
  },
  rose: {
    bg: 'bg-rose-50',
    icon: 'bg-rose-600',
    valor: 'text-rose-700',
    badge: 'bg-rose-100 text-rose-600',
  },
}

export function CardIndicador({
  titulo,
  valor,
  descricao,
  icon: Icon,
  cor = 'emerald',
}: CardIndicadorProps) {
  const cores = coresMap[cor]

  return (
    <div className={`${cores.bg} rounded-2xl p-5 border border-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{titulo}</p>
          <p className={`text-3xl font-bold mt-1 ${cores.valor}`}>{valor}</p>
          {descricao && (
            <p className="text-xs text-gray-500 mt-1">{descricao}</p>
          )}
        </div>
        <div className={`${cores.icon} rounded-xl p-2.5`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  )
}
