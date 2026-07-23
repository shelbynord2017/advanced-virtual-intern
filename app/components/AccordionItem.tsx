'use client'
import { useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export default function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='border-b'>
      <button 
      onClick={() => setIsOpen(!isOpen)} 
      className="accordion__button"
      >
        <span>{question}</span>

        <IoIosArrowDropdown
        className={`accordion__icon ${isOpen ? 'rotated' : ''}`}
        />
      </button>
      {isOpen && <div className="pb-2">{answer}</div>}
    </div>
  )
}
