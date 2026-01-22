-- ============================================
-- Add Foreign Key Constraints (if missing)
-- ============================================
-- Run this if you get PGRST200 errors about missing relationships
-- This ensures Supabase can perform JOIN operations

-- Check if FK already exists before adding
DO $$ 
BEGIN
    -- Add FK constraint for articles.category_id if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'articles_category_id_fkey'
    ) THEN
        ALTER TABLE articles 
        ADD CONSTRAINT articles_category_id_fkey 
        FOREIGN KEY (category_id) 
        REFERENCES categories(id) 
        ON DELETE SET NULL;
        
        RAISE NOTICE 'Added FK constraint: articles_category_id_fkey';
    ELSE
        RAISE NOTICE 'FK constraint already exists: articles_category_id_fkey';
    END IF;
END $$;

-- Verify the constraint
SELECT 
    tc.constraint_name, 
    tc.table_name, 
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_name='articles'
    AND kcu.column_name='category_id';
