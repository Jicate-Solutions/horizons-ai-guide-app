import { useState } from "react";
import { BookOpen, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CourseCard from "./CourseCard";
import type { CourseCategory, CourseInfo } from "./courseExplorerData";

interface CourseResultsProps {
  categories: CourseCategory[];
  groupCode: string;
  onViewDetails: (course: CourseInfo) => void;
}

const CourseResults = ({ categories, groupCode, onViewDetails }: CourseResultsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      courses: cat.courses.filter((course) => {
        const matchesCategory = filterCategory === "all" || cat.name === filterCategory;
        const matchesSearch =
          searchQuery === "" ||
          course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.careers.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
          course.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      }),
    }))
    .filter((cat) => cat.courses.length > 0);

  const totalCourses = filteredCategories.reduce((sum, cat) => sum + cat.courses.length, 0);

  return (
    <div className="space-y-4 mt-6">
      {/* Results Header with Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              📚 Courses for Group {groupCode}
            </h3>
            <p className="text-sm text-gray-500">
              {totalCourses} {totalCourses === 1 ? "course" : "courses"}
              {filterCategory === "all"
                ? ` across ${filteredCategories.length} categories`
                : ` in ${filterCategory}`}
            </p>
          </div>
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search courses or careers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-sm"
            />
          </div>
        </div>

        {/* ── Category Filter ──────────────────────────────────────────
            Redesigned: instead of a thin horizontal-scroll strip of
            identical grey pills, every category is shown at once in a
            wrapping grid, each with its course count, so a student can
            see all their options without scrolling and can tell which
            categories actually have courses for their group. */}
        <div className="mt-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">
            Filter by category
          </p>
          <div className="flex flex-wrap gap-2">
            {/* "All" chip */}
            <button
              onClick={() => setFilterCategory("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filterCategory === "all"
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
              }`}
            >
              All Categories
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                  filterCategory === "all"
                    ? "bg-white/25 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {categories.reduce((sum, c) => sum + c.courses.length, 0)}
              </span>
            </button>

            {/* One chip per category, each showing its course count */}
            {categories.map((cat) => {
              const isActive = filterCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() =>
                    setFilterCategory(isActive ? "all" : cat.name)
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                      : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isActive
                        ? "bg-white/25 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {cat.courses.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Categories */}
      {filteredCategories.map((category) => (
        <div key={category.name}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{category.icon}</span>
            <h4 className="font-semibold text-gray-800">{category.name}</h4>
            <span className="text-xs text-gray-400">({category.courses.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {category.courses.map((course) => (
              <CourseCard key={course.id} course={course} onViewDetails={onViewDetails} />
            ))}
          </div>
        </div>
      ))}

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-gray-500">
            {searchQuery ? `No courses found for "${searchQuery}"` : "Select a group to see available courses"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseResults;
