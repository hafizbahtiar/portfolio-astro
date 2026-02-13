import { ApiClient } from './api-client';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8787/api/v1";

export interface ContactData {
    name: string;
    email: string;
    message: string;
    subject?: string;
    phone?: string;
    source?: string;
}

export interface ContactResponse {
    success: boolean;
    message?: string;
    error?: string;
}

export interface OwnerContact {
    id: number;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';
    source: 'FORM' | 'EMAIL' | 'SOCIAL' | 'OTHER';
    readAt?: string;
    repliedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ContactStats {
    total: number;
    new: number;
    read: number;
    replied: number;
    archived: number;
}

export class ContactService extends ApiClient {
    constructor() {
        super(API_BASE_URL);
    }

    async submitContactForm(data: ContactData): Promise<ContactResponse> {
        try {
            const url = `${this.baseUrl}/contact`;

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                return {
                    success: true,
                    message: result.data?.message || 'Message sent successfully!'
                };
            } else {
                return {
                    success: false,
                    error: result.error || result.message || 'Failed to send message.'
                };
            }
        } catch (error) {
            console.error('Contact submission error:', error);
            return {
                success: false,
                error: 'Network error. Please try again later.'
            };
        }
    }

    async getOwnerContacts(): Promise<OwnerContact[]> {
        const result = await this.get<OwnerContact[]>('owner/contact');
        return result || [];
    }

    async getContactStats(): Promise<ContactStats | null> {
        return this.get<ContactStats>('owner/contact/stats');
    }
}

export const contactService = new ContactService();
export const submitContactForm = (data: ContactData) => contactService.submitContactForm(data);
