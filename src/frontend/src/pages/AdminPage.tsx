import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Check,
  Edit,
  Loader2,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Launch } from "../backend.d";
import { StatusBadge } from "../components/StatusBadge";
import {
  LaunchStatus,
  useCreateLaunch,
  useDeleteLaunch,
  useGetAllLaunches,
  useIsCallerAdmin,
  useUpdateLaunch,
} from "../hooks/useQueries";

interface LaunchFormData {
  projectName: string;
  ticker: string;
  description: string;
  launchDate: string;
  totalSupply: string;
  priceInDoge: string;
  fundraiseGoal: string;
  status: LaunchStatus;
}

const emptyForm: LaunchFormData = {
  projectName: "",
  ticker: "",
  description: "",
  launchDate: "",
  totalSupply: "",
  priceInDoge: "",
  fundraiseGoal: "",
  status: LaunchStatus.upcoming,
};

function LaunchFormModal({
  open,
  onClose,
  editLaunch,
}: {
  open: boolean;
  onClose: () => void;
  editLaunch: Launch | null;
}) {
  const [form, setForm] = useState<LaunchFormData>(emptyForm);
  const createLaunch = useCreateLaunch();
  const updateLaunch = useUpdateLaunch();

  useEffect(() => {
    if (editLaunch) {
      setForm({
        projectName: editLaunch.projectName,
        ticker: editLaunch.ticker,
        description: editLaunch.description,
        launchDate: editLaunch.launchDate ?? "",
        totalSupply:
          editLaunch.totalSupply !== undefined
            ? String(editLaunch.totalSupply)
            : "",
        priceInDoge: editLaunch.priceInDoge,
        fundraiseGoal: editLaunch.fundraiseGoal ?? "",
        status: editLaunch.status,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editLaunch]);

  const isPending = createLaunch.isPending || updateLaunch.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.projectName.trim() ||
      !form.ticker.trim() ||
      !form.priceInDoge.trim()
    ) {
      toast.error("Project name, ticker, and price are required.");
      return;
    }

    const params = {
      projectName: form.projectName.trim(),
      ticker: form.ticker.trim(),
      description: form.description.trim(),
      launchDate: form.launchDate.trim() || null,
      totalSupply: form.totalSupply.trim()
        ? BigInt(form.totalSupply.trim())
        : null,
      priceInDoge: form.priceInDoge.trim(),
      fundraiseGoal: form.fundraiseGoal.trim() || null,
      status: form.status,
    };

    try {
      if (editLaunch) {
        await updateLaunch.mutateAsync({ id: editLaunch.id, ...params });
        toast.success("Launch updated successfully!");
      } else {
        await createLaunch.mutateAsync(params);
        toast.success("Launch created successfully!");
      }
      onClose();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const set = (key: keyof LaunchFormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-lg w-full border-gold/20 p-0 overflow-hidden"
        style={{ background: "oklch(var(--card))" }}
      >
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(var(--gold)), oklch(var(--orange)))",
          }}
        />
        <form onSubmit={(e) => void handleSubmit(e)}>
          <DialogHeader className="px-6 pt-5 pb-0">
            <DialogTitle className="font-display font-bold text-lg">
              {editLaunch ? "Edit Launch" : "Create New Launch"}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4 max-h-[65vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="projectName"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Project Name *
                </Label>
                <Input
                  id="projectName"
                  data-ocid="admin.form.input"
                  value={form.projectName}
                  onChange={(e) => set("projectName", e.target.value)}
                  placeholder="e.g. Doginals Pad"
                  className="border-border/60 bg-muted/30 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="ticker"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Ticker *
                </Label>
                <Input
                  id="ticker"
                  value={form.ticker}
                  onChange={(e) => set("ticker", e.target.value)}
                  placeholder="e.g. $PAD"
                  className="border-border/60 bg-muted/30 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="description"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe this token launch..."
                rows={3}
                className="border-border/60 bg-muted/30 text-sm resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="priceInDoge"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Price in DOGE *
                </Label>
                <Input
                  id="priceInDoge"
                  value={form.priceInDoge}
                  onChange={(e) => set("priceInDoge", e.target.value)}
                  placeholder="e.g. 0.01"
                  className="border-border/60 bg-muted/30 text-sm"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="fundraiseGoal"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Fundraise Goal (DOGE)
                </Label>
                <Input
                  id="fundraiseGoal"
                  value={form.fundraiseGoal}
                  onChange={(e) => set("fundraiseGoal", e.target.value)}
                  placeholder="e.g. 1000000"
                  className="border-border/60 bg-muted/30 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="launchDate"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Launch Date
                </Label>
                <Input
                  id="launchDate"
                  value={form.launchDate}
                  onChange={(e) => set("launchDate", e.target.value)}
                  placeholder="e.g. 2025-06-01"
                  className="border-border/60 bg-muted/30 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="totalSupply"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                >
                  Total Supply
                </Label>
                <Input
                  id="totalSupply"
                  value={form.totalSupply}
                  onChange={(e) => set("totalSupply", e.target.value)}
                  placeholder="e.g. 1000000000"
                  type="number"
                  className="border-border/60 bg-muted/30 text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="status"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wide"
              >
                Status
              </Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as LaunchStatus)}
              >
                <SelectTrigger
                  id="status"
                  data-ocid="admin.form.select"
                  className="border-border/60 bg-muted/30 text-sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: "oklch(var(--popover))" }}>
                  <SelectItem value={LaunchStatus.upcoming}>
                    Upcoming
                  </SelectItem>
                  <SelectItem value={LaunchStatus.live}>Live</SelectItem>
                  <SelectItem value={LaunchStatus.ended}>Ended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="px-6 pb-5 pt-2 flex gap-2">
            <Button
              type="button"
              variant="outline"
              data-ocid="admin.form.cancel_button"
              onClick={onClose}
              disabled={isPending}
              className="border-border/60 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4 mr-1.5" /> Cancel
            </Button>
            <Button
              type="submit"
              data-ocid="admin.form.submit_button"
              disabled={isPending}
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                color: "oklch(var(--primary-foreground))",
              }}
              className="font-semibold"
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <Check className="w-4 h-4 mr-1.5" />
              )}
              {isPending
                ? "Saving…"
                : editLaunch
                  ? "Update Launch"
                  : "Create Launch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function AdminPage() {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const { data: launches, isLoading: launchesLoading } = useGetAllLaunches();
  const deleteLaunch = useDeleteLaunch();

  const [formOpen, setFormOpen] = useState(false);
  const [editLaunch, setEditLaunch] = useState<Launch | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Launch | null>(null);

  // Redirect if not admin (once we know)
  useEffect(() => {
    if (!isAdminLoading && isAdmin === false) {
      void navigate({ to: "/" });
      toast.error("Access denied: Admin only.");
    }
  }, [isAdmin, isAdminLoading, navigate]);

  const handleEdit = (launch: Launch) => {
    setEditLaunch(launch);
    setFormOpen(true);
  };

  const handleCreateNew = () => {
    setEditLaunch(null);
    setFormOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setEditLaunch(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteLaunch.mutateAsync(deleteTarget.id);
      toast.success(`Deleted "${deleteTarget.projectName}"`);
    } catch {
      toast.error("Failed to delete launch.");
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isAdminLoading) {
    return (
      <div
        data-ocid="admin.loading_state"
        className="flex items-center justify-center min-h-screen"
      >
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-start justify-between mb-8 gap-4"
      >
        <div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-1">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage token launches on Doginalspad.
          </p>
        </div>
        <Button
          data-ocid="admin.create_button"
          onClick={handleCreateNew}
          style={{
            background:
              "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
            color: "oklch(var(--primary-foreground))",
          }}
          className="font-semibold flex-shrink-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          New Launch
        </Button>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-xl overflow-hidden border border-border/60 card-glow"
        style={{ background: "oklch(var(--card))" }}
      >
        {launchesLoading ? (
          <div data-ocid="admin.loading_state" className="p-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : (
          <Table data-ocid="admin.table">
            <TableHeader>
              <TableRow className="border-border/60 hover:bg-transparent">
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  Project
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  Ticker
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  Status
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  Price
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide">
                  Launch Date
                </TableHead>
                <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wide text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(launches ?? []).length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground text-sm"
                  >
                    No launches yet. Create your first one!
                  </TableCell>
                </TableRow>
              ) : (
                (launches ?? []).map((launch, i) => (
                  <TableRow
                    key={launch.id.toString()}
                    data-ocid="admin.row"
                    className="border-border/40 hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="font-heading font-semibold text-sm">
                      {launch.projectName}
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-gold border border-gold/20">
                        {launch.ticker}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={launch.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {launch.priceInDoge} DOGE
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {launch.launchDate ?? "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`admin.edit_button.${i + 1}`}
                          onClick={() => handleEdit(launch)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-gold hover:bg-gold/10"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-ocid={`admin.delete_button.${i + 1}`}
                          onClick={() => setDeleteTarget(launch)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </motion.div>

      {/* Create/Edit Modal */}
      <LaunchFormModal
        open={formOpen}
        onClose={handleFormClose}
        editLaunch={editLaunch}
      />

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent
          className="border-destructive/30 max-w-sm"
          style={{ background: "oklch(var(--card))" }}
        >
          <AlertDialogHeader>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-destructive/10 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <AlertDialogTitle className="font-display font-bold">
              Delete Launch
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {deleteTarget?.projectName}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <Button
              variant="outline"
              data-ocid="admin.delete_cancel_button"
              onClick={() => setDeleteTarget(null)}
              className="border-border/60 text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              data-ocid="admin.delete_confirm_button"
              onClick={() => void handleDeleteConfirm()}
              disabled={deleteLaunch.isPending}
              className="font-semibold"
            >
              {deleteLaunch.isPending ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 mr-1.5" />
              )}
              {deleteLaunch.isPending ? "Deleting…" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
