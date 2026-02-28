import React, { useState } from "react";
import { Truck } from "lucide-react";
import type { ShippingFormState } from "../../interface";
interface ShippingFormProps {
  onSubmit: (data: any) => void;
  initialData?: Partial<ShippingFormState>;
}
export default function ShippingForm({
  onSubmit,
  initialData = {},
}: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingFormState>({
    customer_name: initialData.customer_name || "",
    customer_email: initialData.customer_email || "",
    customer_phone: initialData.customer_phone || "",
    shipping_address: initialData.shipping_address || "",
    city: initialData.city || "",
    postal_code: initialData.postal_code || "",
    shipping_method: initialData.shipping_method || "standard",
    payment_method: initialData.payment_method || "cod",
  });

  const [errors, setErrors] = useState<Partial<ShippingFormState>>({});

  const validate = () => {
    const newErrors: Partial<ShippingFormState> = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "Name is required";
    }

    if (!formData.customer_email.trim()) {
      newErrors.customer_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.customer_email)) {
      newErrors.customer_email = "Email is invalid";
    }

    if (!formData.customer_phone.trim()) {
      newErrors.customer_phone = "Phone is required";
    }

    if (!formData.shipping_address.trim()) {
      newErrors.shipping_address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
    // Clear error when user starts typing
    if (errors[target.name as keyof ShippingFormState]) {
      setErrors({
        ...errors,
        [target.name]: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">Full Name *</label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.customer_name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="John Doe"
        />
        {errors.customer_name && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <input
          type="email"
          name="customer_email"
          value={formData.customer_email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.customer_email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="john@example.com"
        />
        {errors.customer_email && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2">Phone Number *</label>
        <input
          type="tel"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.customer_phone ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="+20 123 456 7890"
        />
        {errors.customer_phone && (
          <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium mb-2">Address *</label>
        <textarea
          name="shipping_address"
          value={formData.shipping_address}
          onChange={handleChange}
          rows={3}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.shipping_address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Street address, building, apartment"
        />
        {errors.shipping_address && (
          <p className="text-red-500 text-sm mt-1">{errors.shipping_address}</p>
        )}
      </div>

      {/* City & Postal Code */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Cairo"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Postal Code</label>
          <input
            type="text"
            name="postal_code"
            value={formData.postal_code}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12345"
          />
        </div>
      </div>

      {/* Shipping Method */}
      <div>
        <label className="block text-sm font-medium mb-3">
          <Truck className="inline w-5 h-5 mr-2" />
          Shipping Method *
        </label>
        <div className="space-y-3">
          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="shipping_method"
              value="standard"
              checked={formData.shipping_method === "standard"}
              onChange={handleChange}
              className="mr-3"
            />
            <div className="flex-1">
              <p className="font-semibold">Standard Shipping</p>
              <p className="text-sm text-gray-600">3-5 business days</p>
            </div>
            <p className="font-bold">30 EGP</p>
          </label>

          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="shipping_method"
              value="express"
              checked={formData.shipping_method === "express"}
              onChange={handleChange}
              className="mr-3"
            />
            <div className="flex-1">
              <p className="font-semibold">Express Shipping</p>
              <p className="text-sm text-gray-600">1-2 business days</p>
            </div>
            <p className="font-bold">60 EGP</p>
          </label>

          <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="shipping_method"
              value="pickup"
              checked={formData.shipping_method === "pickup"}
              onChange={handleChange}
              className="mr-3"
            />
            <div className="flex-1">
              <p className="font-semibold">Store Pickup</p>
              <p className="text-sm text-gray-600">Pick up from our store</p>
            </div>
            <p className="font-bold text-green-600">FREE</p>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        Continue to Review
      </button>
    </form>
  );
}
