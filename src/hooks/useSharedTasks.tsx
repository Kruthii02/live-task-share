
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "@/components/ui/sonner";

type SharedTask = Database['public']['Tables']['shared_tasks']['Row'];
type SharedTaskInsert = Database['public']['Tables']['shared_tasks']['Insert'];
type SharedTaskUpdate = Database['public']['Tables']['shared_tasks']['Update'];

export const useSharedTasks = () => {
  const [sharedTasks, setSharedTasks] = useState<SharedTask[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSharedTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('shared_tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSharedTasks(data || []);
    } catch (error) {
      console.error('Error fetching shared tasks:', error);
      toast.error('Failed to load shared tasks');
    } finally {
      setLoading(false);
    }
  };

  const addSharedTask = async (taskData: { 
    task_title: string; 
    task_description?: string; 
    shared_with?: string[] 
  }) => {
    if (!user) return;

    try {
      const newTask: SharedTaskInsert = {
        task_title: taskData.task_title,
        task_description: taskData.task_description || null,
        created_by: user.id,
        shared_with: taskData.shared_with || [],
        status: 'pending'
      };

      const { data, error } = await supabase
        .from('shared_tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) throw error;

      setSharedTasks(prev => [data, ...prev]);
      toast.success('✨ Shared task created successfully!');
      return data;
    } catch (error) {
      console.error('Error adding shared task:', error);
      toast.error('Failed to create shared task');
    }
  };

  const updateSharedTask = async (taskId: string, updates: SharedTaskUpdate) => {
    try {
      const { data, error } = await supabase
        .from('shared_tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setSharedTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...data } : task
      ));
      toast.success('📝 Shared task updated!');
      return data;
    } catch (error) {
      console.error('Error updating shared task:', error);
      toast.error('Failed to update shared task');
    }
  };

  const deleteSharedTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('shared_tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setSharedTasks(prev => prev.filter(task => task.id !== taskId));
      toast.success('🗑️ Shared task deleted!');
    } catch (error) {
      console.error('Error deleting shared task:', error);
      toast.error('Failed to delete shared task');
    }
  };

  useEffect(() => {
    fetchSharedTasks();
  }, [user]);

  return {
    sharedTasks,
    loading,
    addSharedTask,
    updateSharedTask,
    deleteSharedTask,
    refetch: fetchSharedTasks
  };
};
