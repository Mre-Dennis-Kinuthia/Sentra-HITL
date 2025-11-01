"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockAnnotations } from "@/lib/mock-data"
import { InfoIcon } from "@/components/icons"

export function AnnotationHistory() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Annotation History</CardTitle>
        <CardDescription>Your recent annotations and their status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden">
        <div className="mb-4 p-3 bg-secondary/50 rounded-lg border border-border flex items-start gap-2 text-xs text-muted-foreground">
          <InfoIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="font-medium text-foreground">Keyboard Shortcuts:</p>
            <p>B: Bbox • P: Polygon • O: Point • +/-: Zoom • Ctrl+Z: Undo • ?: Help</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAnnotations.slice(0, 5).map((annotation) => (
                <TableRow key={annotation.id}>
                  <TableCell className="font-medium text-xs">#{annotation.id}</TableCell>
                  <TableCell className="capitalize text-xs">{annotation.type}</TableCell>
                  <TableCell>
                    <Badge variant={annotation.status === "approved" ? "default" : "secondary"} className="text-xs">
                      {annotation.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="xs" className="h-7 text-xs">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
