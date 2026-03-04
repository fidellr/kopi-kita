"use client";
import { useState, useMemo } from "react";
import { Customer } from "@prisma/client";
import { Search, Plus, Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import PageHeader from "@/components/ui/PageHeader";
import EmptyState from "@/components/ui/EmptyState";
import CustomerCard from "@/components/customers/CustomerCard";
import CustomerModal from "@/components/customers/CustomerModal";
import TagFilterPanel from "@/components/customers/TagFilterPanel";
import { Coffee } from "lucide-react";

interface CustomersClientProps {
  initialCustomers: Customer[];
  allTags: string[];
}

export default function CustomersClient({
  initialCustomers,
  allTags,
}: CustomersClientProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        const matchesSearch =
          !search ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
          c.favoriteDrink?.toLowerCase().includes(search.toLowerCase());
        const matchesTags =
          filterTags.length === 0 ||
          filterTags.every((ft) => c.tags.includes(ft));
        return matchesSearch && matchesTags;
      }),
    [customers, search, filterTags],
  );

  const handleSaved = (customer: Customer) => {
    setCustomers((prev) => {
      const idx = prev.findIndex((c) => c.id === customer.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = customer;
        return next;
      }
      return [customer, ...prev];
    });
    setModalOpen(false);
    setEditingCustomer(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/customers/${id}`, { method: "DELETE" });
      if (res.ok) setCustomers((prev) => prev.filter((c) => c.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="animate-in">
      <PageHeader
        title="Customers"
        description={`${customers.length} coffee lovers in your community`}
      >
        <button
          onClick={() => {
            setEditingCustomer(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 kopi-gradient text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Customer
        </button>
      </PageHeader>

      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, drink, or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm transition-all",
            showFilters || filterTags.length > 0
              ? "border-primary bg-primary/5 text-primary"
              : "border-border bg-white text-foreground hover:border-primary/40",
          )}
        >
          <Filter className="w-4 h-4" />
          Filter
          {filterTags.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {filterTags.length}
            </span>
          )}
          <ChevronDown
            className={cn(
              "w-3.5 h-3.5 transition-transform",
              showFilters && "rotate-180",
            )}
          />
        </button>

        <span className="text-sm text-muted-foreground">
          {filtered.length} of {customers.length}
        </span>
      </div>

      {showFilters && (
        <TagFilterPanel
          allTags={allTags}
          activeTags={filterTags}
          onToggle={(tag) =>
            setFilterTags((prev) =>
              prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag],
            )
          }
          onClear={() => setFilterTags([])}
        />
      )}

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Coffee className="w-10 h-10" />}
          title="No customers found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onEdit={() => {
                setEditingCustomer(customer);
                setModalOpen(true);
              }}
              onDelete={() => handleDelete(customer.id)}
              isDeleting={deletingId === customer.id}
            />
          ))}
        </div>
      )}

      {modalOpen && (
        <CustomerModal
          customer={editingCustomer}
          onClose={() => {
            setModalOpen(false);
            setEditingCustomer(null);
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
