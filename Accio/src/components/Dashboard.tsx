'use client'

import {
  ChevronDown,
  ChevronRight,
  FileText,
  Grid,
  Plus,
  Search,
  Share2,
  UserCircle,
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { useDocuments } from '@/store/documents'
import { useChat } from '@/store/chat'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function Dashboard() {
  const { documents, loading: documentsLoading } = useDocuments()
  const { messages, loading: chatLoading, sendMessage } = useChat()
  const [input, setInput] = React.useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    await sendMessage(input)
    setInput('')
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      Financials: 'bg-purple-100 text-purple-800',
      'Marketing Materials': 'bg-purple-100 text-purple-800',
      Product: 'bg-red-100 text-red-800',
      Customer: 'bg-amber-100 text-amber-800',
      'Public Report': 'bg-green-100 text-green-800',
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-background p-4">
        <div className="flex items-center gap-2 pb-4">
          <Grid className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Hebbia</span>
        </div>
        <div className="space-y-4">
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Explore templates
          </Button>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search matrices" className="pl-8" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Today
              </div>
              <div className="mt-2 space-y-1">
                <Link
                  href="#"
                  className="block rounded-md bg-accent px-2 py-1 text-sm font-medium"
                >
                  First Screen Project Alpha
                </Link>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Q324 Portfolio Review
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Yesterday
              </div>
              <div className="mt-2 space-y-1">
                <Link href="#" className="block px-2 py-1 text-sm">
                  Hannibal Revenue
                </Link>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Commercial Contracts
                </Link>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Patent Prior Art
                </Link>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Deal Terms
                </Link>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Projects
              </div>
              <div className="mt-2 space-y-1">
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center px-2 py-1 text-sm">
                    <ChevronRight className="mr-1 h-3 w-3" />
                    Project Alpha
                  </CollapsibleTrigger>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center px-2 py-1 text-sm">
                    <ChevronRight className="mr-1 h-3 w-3" />
                    Co
                  </CollapsibleTrigger>
                </Collapsible>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full items-center px-2 py-1 text-sm">
                    <ChevronRight className="mr-1 h-3 w-3" />
                    Acme Corp
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-4 space-y-1">
                    <Link href="#" className="block px-2 py-1 text-sm">
                      Acme Revenue
                    </Link>
                    <Link href="#" className="block px-2 py-1 text-sm">
                      Acme Investment Risks
                    </Link>
                  </CollapsibleContent>
                </Collapsible>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Nordic Telecoms
                </Link>
                <Link href="#" className="block px-2 py-1 text-sm">
                  Lease Agreements
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">First Screen Project Alpha</h1>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <span className="text-sm text-muted-foreground">
              Saved at 10:49am
            </span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback>
              <UserCircle className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </header>

        <div className="flex-1 p-4">
          {/* Chat Interface */}
          <Card className="mb-4">
            <ScrollArea className="h-[300px] p-4">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={msg.role === 'user' ? 'User' : 'Assistant'}
                      />
                      <AvatarFallback>
                        {msg.role === 'user' ? 'U' : 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="font-semibold">
                        {msg.role === 'user' ? 'You' : 'Assistant'}
                      </div>
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <form onSubmit={handleSubmit} className="p-4">
              <Input
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </form>
          </Card>

          {/* Document Table */}
          <div className="rounded-lg border">
            <div className="flex items-center justify-between p-4">
              <Button variant="ghost" className="text-sm">
                Display
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Add documents
                </Button>
                <Button variant="outline" size="sm">
                  Add columns
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">#</TableHead>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Document Type</TableHead>
                  <TableHead>Investment Risks</TableHead>
                  <TableHead>Market Considerations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc, index) => (
                  <TableRow key={doc.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <ChevronRight className="h-4 w-4" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {doc.name}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getTypeColor(doc.type)}
                      >
                        {doc.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {doc.investmentRisks}
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {doc.marketConsiderations}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={7}>
                    <Button
                      variant="ghost"
                      className="h-8 w-full justify-start text-muted-foreground"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add row
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}