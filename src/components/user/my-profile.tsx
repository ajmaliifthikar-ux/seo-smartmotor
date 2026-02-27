'use client';

import { useState, useEffect } from 'react';
import { UserProfile } from '@/types/user';
import { Loader2, User, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function MyProfile() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data: UserProfile = await response.json();
      setUserProfile(data);
      reset(data); // Set form default values
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const onUpdateProfileSubmit = async (data: ProfileFormData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      toast.success('Profile updated successfully!');
      fetchUserProfile(); // Re-fetch to ensure UI is up-to-date
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-black/5 shadow-xl flex flex-col items-center justify-center min-h-[300px]">
        <Loader2 className="h-10 w-10 animate-spin text-brand-red mb-4" />
        <span className="text-xs font-black uppercase tracking-widest text-gray-400">Loading profile...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-brand-red/20 shadow-xl text-center">
        <p className="text-brand-red font-bold uppercase text-xs tracking-widest mb-2">Sync Error</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-brand-bg flex items-center justify-center text-brand-dark border border-black/5">
          <User size={20} />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-brand-dark text-balance">Account Information</h2>
      </div>

      <form onSubmit={handleSubmit(onUpdateProfileSubmit)} className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
          <Input 
            id="fullName" 
            {...register('fullName')} 
            className="h-12 bg-brand-bg border-black/5 text-brand-dark placeholder:text-gray-400 rounded-xl focus:ring-1 focus:ring-brand-red/50 transition-all font-bold" 
          />
          {errors.fullName && <p className="text-brand-red text-[10px] font-bold px-1">{errors.fullName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
          <Input 
            id="email" 
            {...register('email')} 
            type="email" 
            disabled 
            className="h-12 bg-gray-100 border-transparent text-gray-500 rounded-xl cursor-not-allowed font-medium" 
          />
          {errors.email && <p className="text-brand-red text-[10px] font-bold px-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phone" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
          <Input 
            id="phone" 
            {...register('phone')} 
            type="tel" 
            className="h-12 bg-brand-bg border-black/5 text-brand-dark placeholder:text-gray-400 rounded-xl focus:ring-1 focus:ring-brand-red/50 transition-all font-bold" 
          />
          {errors.phone && <p className="text-brand-red text-[10px] font-bold px-1">{errors.phone.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="address" className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Address</label>
          <Input 
            id="address" 
            {...register('address')} 
            className="h-12 bg-brand-bg border-black/5 text-brand-dark placeholder:text-gray-400 rounded-xl focus:ring-1 focus:ring-brand-red/50 transition-all font-bold" 
          />
          {errors.address && <p className="text-brand-red text-[10px] font-bold px-1">{errors.address.message}</p>}
        </div>

        <Button type="submit" variant="primary" className="w-full h-14 rounded-xl font-black text-xs uppercase tracking-widest mt-4 shadow-lg shadow-brand-red/10">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Update Profile
        </Button>
      </form>
    </div>
  );
}
