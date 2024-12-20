'use client'

import { useEffect } from 'react'
import { useDocuments } from '@/store/documents'
import { useChat } from '@/store/chat'
import { Dashboard } from '@/components/Dashboard'

export default function Page() {
  const { fetchDocuments } = useDocuments()
  const { fetchHistory } = useChat()

  useEffect(() => {
    fetchDocuments()
    fetchHistory()
  }, [fetchDocuments, fetchHistory])

  return <Dashboard />
}