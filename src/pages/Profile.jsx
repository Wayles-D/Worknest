import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import AvatarPlaceholder from "@/assets/images/avatar-placeholder.png";


const submitProfile = async (data) => {
  await new Promise((res) => setTimeout(res, 1000));
  console.log("Profile saved:", data);
  return data;
};


const Profile = () => {
  const fileInputRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    bio: "",
  });

  const mutation = useMutation({
    mutationFn: submitProfile,
  });

  const avatarSrc = avatarPreview || AvatarPlaceholder;

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...form,
      avatar: avatarPreview,
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF6F0] px-4 py-6 md:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-6 md:p-10">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-semibold mb-8">My Profile</h1>

        {/* Avatar */}
        <div className="flex justify-center mb-10">
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <img
              src={avatarSrc}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow border"
            >
              <Camera size={14} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border rounded-md px-4 py-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-md px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 000 000 000"
                className="w-full border rounded-md px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of birth
              </label>
              <input
                name="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded-md px-4 py-3 text-sm"
              >
                <option value="">Select country</option>
                <option>Nigeria</option>
                <option>Ghana</option>
                <option>Kenya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Write something about you"
              className="w-full border rounded-md px-4 py-3 text-sm resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-6 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {mutation.isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Success state */}
        {mutation.isSuccess && (
          <p className="text-sm text-green-600 mt-4">
            Profile saved successfully.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
