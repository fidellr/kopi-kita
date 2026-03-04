import { Customer } from "@prisma/client";
import { Edit, Trash2, Phone, Mail, Coffee } from "lucide-react";
import { cn, getTagColor, formatRelativeDate } from "@/lib/utils";
import TagBadge from "@/components/ui/TagBadge";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface CustomerCardProps {
  customer: Customer;
  onEdit: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export default function CustomerCard({
  customer,
  onEdit,
  onDelete,
  isDeleting,
}: CustomerCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kopi-200 to-kopi-300 flex items-center justify-center flex-shrink-0">
            <span className="text-kopi-800 font-bold text-sm">
              {customer.name[0]}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">
              {customer.name}
            </h3>
            <p className="text-xs text-muted-foreground">
              {formatRelativeDate(customer.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <LoadingSpinner size="sm" color="primary" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {customer.favoriteDrink && (
        <div className="flex items-center gap-2 mb-2">
          <Coffee className="w-3.5 h-3.5 text-kopi-500 flex-shrink-0" />
          <span className="text-xs text-foreground truncate">
            {customer.favoriteDrink}
          </span>
        </div>
      )}

      {customer.contact && (
        <div className="flex items-center gap-2 mb-2">
          {customer.contact.includes("@") ? (
            <Mail className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          ) : (
            <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          )}
          <span className="text-xs text-muted-foreground truncate">
            {customer.contact}
          </span>
        </div>
      )}

      {customer.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/50">
          {customer.tags.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
          {customer.tags.length > 4 && (
            <span className="text-xs text-muted-foreground self-center">
              +{customer.tags.length - 4}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
