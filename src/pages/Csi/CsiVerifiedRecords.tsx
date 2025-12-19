

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldCheck } from "lucide-react";
import {
  CsiService,
  CsiVerifiedRecord,
  PaginationMeta,
} from "../../lib/api/csi/csi.service";

export default function CsiVerifiedRecords() {
  const [records, setRecords] = useState<CsiVerifiedRecord[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const res = await CsiService.getVerifiedRecords({
        page,
        limit,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      setRecords(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error("CSI verified records error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [page]);

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b bg-gray-50/50">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[#295F58]" />
          Verified Biochar Records
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <Label className="text-xs">Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-xs">End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={fetchRecords} className="w-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        {isLoading ? (
          <p className="text-center text-sm text-muted-foreground py-10">
            Loading records...
          </p>
        ) : records.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            <ShieldCheck className="mx-auto h-10 w-10 mb-3 text-[#295F58]" />
            <p className="text-sm">No verified records available yet.</p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Site</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Verified At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.batchNumber}</TableCell>
                    <TableCell>{record.siteCode}</TableCell>
                    <TableCell>{record.quantity}</TableCell>
                    <TableCell>
                      {new Date(record.verifiedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            {meta && (
              <div className="flex items-center justify-between mt-6">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {meta.page} of {meta.totalPages || 1}
                </span>

                <Button
                  variant="outline"
                  disabled={page === meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
