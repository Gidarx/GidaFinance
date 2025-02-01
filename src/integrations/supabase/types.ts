export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Account: {
        Row: {
          balance: number
          createdAt: string
          id: string
          name: string
          updatedAt: string
          userId: string
        }
        Insert: {
          balance?: number
          createdAt?: string
          id: string
          name: string
          updatedAt: string
          userId: string
        }
        Update: {
          balance?: number
          createdAt?: string
          id?: string
          name?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Account_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Bill: {
        Row: {
          amount: number
          createdAt: string
          dueDate: string
          id: string
          isPaid: boolean
          name: string
          updatedAt: string
          userId: string
        }
        Insert: {
          amount: number
          createdAt?: string
          dueDate: string
          id: string
          isPaid?: boolean
          name: string
          updatedAt: string
          userId: string
        }
        Update: {
          amount?: number
          createdAt?: string
          dueDate?: string
          id?: string
          isPaid?: boolean
          name?: string
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Bill_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      FinancialGoal: {
        Row: {
          createdAt: string
          currentAmount: number
          deadline: string | null
          id: string
          name: string
          targetAmount: number
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          currentAmount?: number
          deadline?: string | null
          id: string
          name: string
          targetAmount: number
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          currentAmount?: number
          deadline?: string | null
          id?: string
          name?: string
          targetAmount?: number
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "FinancialGoal_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      Transaction: {
        Row: {
          accountId: string
          amount: number
          category: string
          createdAt: string
          date: string
          description: string | null
          id: string
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Insert: {
          accountId: string
          amount: number
          category: string
          createdAt?: string
          date: string
          description?: string | null
          id: string
          type: Database["public"]["Enums"]["TransactionType"]
          updatedAt: string
          userId: string
        }
        Update: {
          accountId?: string
          amount?: number
          category?: string
          createdAt?: string
          date?: string
          description?: string | null
          id?: string
          type?: Database["public"]["Enums"]["TransactionType"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "Transaction_accountId_fkey"
            columns: ["accountId"]
            isOneToOne: false
            referencedRelation: "Account"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Transaction_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
      User: {
        Row: {
          createdAt: string
          email: string
          id: string
        }
        Insert: {
          createdAt?: string
          email: string
          id: string
        }
        Update: {
          createdAt?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      UserPreferences: {
        Row: {
          createdAt: string
          currency: string
          defaultCategories: string[] | null
          hasCompletedOnboarding: boolean
          id: string
          monthlyBudget: number | null
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          currency?: string
          defaultCategories?: string[] | null
          hasCompletedOnboarding?: boolean
          id: string
          monthlyBudget?: number | null
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          currency?: string
          defaultCategories?: string[] | null
          hasCompletedOnboarding?: boolean
          id?: string
          monthlyBudget?: number | null
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "UserPreferences_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "User"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      TransactionType: "INCOME" | "EXPENSE"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
