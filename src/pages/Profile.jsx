import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { Camera, User, Mail, Phone, CheckCircle, Edit2 } from "lucide-react";
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
    <div className="min-h-screen container ">
      <div className=" bg-white rounded-lg shadow-sm p-6 md:p-10">
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium">Full Name</label>
              <button
                type="button"
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                <Edit2 size={14} />
                <span>Edit</span>
              </button>
            </div>
            <div className="relative">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Saidi"
                className="w-full border rounded-md px-4 py-3 text-sm pr-10"
              />
              <User
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  Email Address
                </label>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="relative">
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Saidimoney@work.com"
                  className="w-full border rounded-md px-4 py-3 text-sm pr-10"
                />
                <Mail
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  Phone Number
                </label>
                <div className="flex items-center gap-1 text-sm">
                  <Edit2 size={14} />
                  <span>Verified</span>
                </div>
              </div>
              <div className="relative">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 815 555 5559"
                  className="w-full border rounded-md px-4 py-3 text-sm pr-10"
                />
                <Phone
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">
                  Date of birth
                </label>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="relative">
                <input
                  name="dob"
                  type="text"
                  value={form.dob}
                  onChange={handleChange}
                  placeholder="20 Jan 1990"
                  className="w-full border rounded-md px-4 py-3 text-sm pr-10"
                />
                <User
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium">Country</label>
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <Edit2 size={14} />
                  <span>Edit</span>
                </button>
              </div>
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
          <div className="flex justify-end gap-10 pt-6">
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="px-6 py-2 my-1 font-semibold rounded-md bg-orange-500 text-black hover:bg-orange-600 disabled:opacity-50"
            >
              {mutation.isLoading ? "Saving..." : "Update"}
            </button>
            <button
              type="button"
              className="px-6 py-2 my-1 font-semibold rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Cancel
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
