
-- Create enum for task status
CREATE TYPE public.task_status AS ENUM ('pending', 'in-progress', 'completed');

-- Create tasks table for personal tasks
CREATE TABLE public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status public.task_status NOT NULL DEFAULT 'pending',
    due_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on tasks table
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tasks table
CREATE POLICY "Users can view their own tasks" 
    ON public.tasks 
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks" 
    ON public.tasks 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks" 
    ON public.tasks 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks" 
    ON public.tasks 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create shared_tasks table for collaborative tasks
CREATE TABLE public.shared_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    task_title TEXT NOT NULL,
    task_description TEXT,
    status public.task_status NOT NULL DEFAULT 'pending',
    shared_with UUID[] NOT NULL DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on shared_tasks table
ALTER TABLE public.shared_tasks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for shared_tasks table
CREATE POLICY "Users can view tasks they created or are shared with" 
    ON public.shared_tasks 
    FOR SELECT 
    USING (
        auth.uid() = created_by OR 
        auth.uid() = ANY(shared_with)
    );

CREATE POLICY "Users can insert shared tasks" 
    ON public.shared_tasks 
    FOR INSERT 
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update tasks they created or are shared with" 
    ON public.shared_tasks 
    FOR UPDATE 
    USING (
        auth.uid() = created_by OR 
        auth.uid() = ANY(shared_with)
    );

CREATE POLICY "Only creators can delete shared tasks" 
    ON public.shared_tasks 
    FOR DELETE 
    USING (auth.uid() = created_by);

-- Create indexes for better performance
CREATE INDEX idx_tasks_user_id ON public.tasks(user_id);
CREATE INDEX idx_tasks_status ON public.tasks(status);
CREATE INDEX idx_shared_tasks_created_by ON public.shared_tasks(created_by);
CREATE INDEX idx_shared_tasks_shared_with ON public.shared_tasks USING GIN(shared_with);
