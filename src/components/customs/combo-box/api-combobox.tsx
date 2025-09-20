"use client"

import * as React from "react"
import { Check, ChevronDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface ComboboxOption {
  value: string
  label: string
  [key: string]: any // Allow additional properties
}

export interface ApiResponse {
  data: ComboboxOption[]
  total?: number
  page?: number
  totalPages?: number
  totalPage?: number // Added support for totalPage field
  hasMore?: boolean
  metadata?: {
    // Added metadata object support
    page?: number
    size?: number
    total?: number
    totalPage?: number
  }
}

export interface ApiComboboxProps {
  apiUrl: string
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  value?: string
  onChange?: (value: string, option: ComboboxOption | null) => void
  onSelectionChange?: (option: ComboboxOption | null) => void
  disabled?: boolean
  className?: string
  // API configuration
  searchParam?: string // Parameter name for search query (default: 'search')
  pageParam?: string // Parameter name for page (default: 'page')
  limitParam?: string // Parameter name for limit (default: 'limit')
  pageSize?: number // Items per page (default: 10)
  // Data transformation
  transformResponse?: (response: any) => ApiResponse
  // Additional query parameters
  additionalParams?: Record<string, string | number>
  // Headers for API requests
  headers?: Record<string, string>
}

export function ApiCombobox({
  apiUrl,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No options found.",
  value,
  onChange,
  onSelectionChange,
  disabled = false,
  className,
  searchParam = "search",
  pageParam = "page",
  limitParam = "limit",
  pageSize = 10,
  transformResponse,
  additionalParams = {},
  headers = {},
}: ApiComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState<ComboboxOption[]>([])
  const [loading, setLoading] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(0)
  const [hasMore, setHasMore] = React.useState(true)
  const [selectedOption, setSelectedOption] = React.useState<ComboboxOption | null>(null)

  const memoizedAdditionalParams = React.useMemo(() => additionalParams, [JSON.stringify(additionalParams)])
  const memoizedHeaders = React.useMemo(() => headers, [JSON.stringify(headers)])

  // Find selected option when value changes
  React.useEffect(() => {
    if (value) {
      const option = options.find((opt) => opt.value === value)
      setSelectedOption(option || null)
    } else {
      setSelectedOption(null)
    }
  }, [value, options])

  const fetchData = React.useCallback(
    async (search = "", page = 0, append = false) => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          [searchParam]: search,
          [pageParam]: page.toString(),
          [limitParam]: pageSize.toString(),
          ...Object.entries(memoizedAdditionalParams).reduce(
            (acc, [key, val]) => {
              acc[key] = val.toString()
              return acc
            },
            {} as Record<string, string>,
          ),
        })

        const response = await fetch(`${apiUrl}?${params}`, {
          headers: {
            "Content-Type": "application/json",
            ...memoizedHeaders,
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const rawData = await response.json()

        // Transform response if transformer provided
        const apiResponse: ApiResponse = transformResponse ? transformResponse(rawData) : rawData

        const newOptions = apiResponse.data || []

        if (append) {
          setOptions((prev) => [...prev, ...newOptions])
        } else {
          setOptions(newOptions)
        }

        // Determine if there are more pages
        if (apiResponse.hasMore !== undefined) {
          setHasMore(apiResponse.hasMore)
        } else {
          // Check for totalPages in multiple locations
          const totalPages = apiResponse.totalPages || apiResponse.totalPage || apiResponse.metadata?.totalPage

          if (totalPages !== undefined) {
            setHasMore(page < totalPages - 1)
          } else {
            // Fallback: assume more pages if we got a full page of results
            setHasMore(newOptions.length === pageSize)
          }
        }

        setCurrentPage(page)
      } catch (error) {
        console.error("Error fetching data:", error)
        setOptions([])
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    },
    [
      apiUrl,
      searchParam,
      pageParam,
      limitParam,
      pageSize,
      memoizedAdditionalParams,
      memoizedHeaders,
      transformResponse,
    ],
  )

  const shouldFetchRef = React.useRef(true)
  const lastSearchQueryRef = React.useRef("")

  React.useEffect(() => {
    // Only fetch if search query actually changed or it's the initial load
    if (shouldFetchRef.current || lastSearchQueryRef.current !== searchQuery) {
      fetchData(searchQuery, 0, false)
      shouldFetchRef.current = false
      lastSearchQueryRef.current = searchQuery
    }
  }, [searchQuery, fetchData])

  React.useEffect(() => {
    shouldFetchRef.current = true
  }, [apiUrl])

  // Load more data
  const loadMore = () => {
    if (hasMore && !loading) {
      fetchData(searchQuery, currentPage + 1, true)
    }
  }

  // Handle search input change
  const handleSearch = (search: string) => {
    setSearchQuery(search)
    setCurrentPage(0)
  }

  // Handle option selection
  const handleSelect = (selectedValue: string) => {
    const option = options.find((opt) => opt.value === selectedValue) || null

    if (selectedValue === value) {
      // Deselect if same value is clicked
      setSelectedOption(null)
      onChange?.("", null)
      onSelectionChange?.(null)
    } else {
      setSelectedOption(option)
      onChange?.(selectedValue, option)
      onSelectionChange?.(option)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput placeholder={searchPlaceholder} value={searchQuery} onValueChange={handleSearch} />
          <CommandList>
            <CommandEmpty>
              {loading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Loading...</span>
                </div>
              ) : (
                emptyText
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
              {hasMore && (
                <CommandItem onSelect={loadMore} className="justify-center text-muted-foreground" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading more...
                    </>
                  ) : (
                    "Load more..."
                  )}
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
