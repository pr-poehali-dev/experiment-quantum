import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"

const slides = [
  {
    url: "https://cdn.poehali.dev/projects/c5b79053-b5f8-436d-8e51-19a6c162e13e/files/cff4eddd-d112-4723-ad8d-7acc7e9a1b21.jpg",
    caption: "Стадион до реконструкции"
  },
  {
    url: "https://cdn.poehali.dev/projects/c5b79053-b5f8-436d-8e51-19a6c162e13e/files/9b06e57a-7898-4b4f-b994-879685188e15.jpg",
    caption: "Процесс благоустройства"
  },
  {
    url: "https://cdn.poehali.dev/projects/c5b79053-b5f8-436d-8e51-19a6c162e13e/files/4d6a69d5-c22a-4381-83a6-765710f1d79c.jpg",
    caption: "Обновлённое поле"
  },
  {
    url: "https://cdn.poehali.dev/projects/c5b79053-b5f8-436d-8e51-19a6c162e13e/files/91ed0c67-f139-4575-9d29-b14fe927e6c1.jpg",
    caption: "Дети играют на новом стадионе"
  },
  {
    url: "https://cdn.poehali.dev/projects/c5b79053-b5f8-436d-8e51-19a6c162e13e/files/259c9daf-4aaf-42eb-810f-c6546d152aad.jpg",
    caption: "Вечернее освещение стадиона"
  },
]

interface GallerySectionProps {
  isActive: boolean
}

export default function GallerySection({ isActive }: GallerySectionProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent(i => (i - 1 + slides.length) % slides.length)
  const next = () => setCurrent(i => (i + 1) % slides.length)

  return (
    <section
      id="gallery"
      className="relative h-screen w-full snap-start flex flex-col justify-center items-center p-8 md:p-16"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Фотогалерея
      </motion.h2>

      <motion.div
        className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isActive ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={slides[current].url}
            alt={slides[current].caption}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
        >
          <Icon name="ChevronRight" size={24} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm md:text-base px-4 py-2 text-center">
          {slides[current].caption}
        </div>
      </motion.div>

      <motion.div
        className="flex gap-2 mt-5"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-gray-600'}`}
          />
        ))}
      </motion.div>
    </section>
  )
}
