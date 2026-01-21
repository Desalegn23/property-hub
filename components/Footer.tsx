import { Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white dark:bg-slate-900">
      <div className="container-main py-12 md:py-16">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
              <Building2 size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">PropertyHub</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left text-balance">
            © {new Date().getFullYear()} PropertyHub. Built for the Modern Web Exam.
          </p>
          <div className="flex gap-4">
             {/* Social links could go here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
