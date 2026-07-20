export default function CampaignForm() {
  return (
    <form className="bg-white rounded-xl shadow p-6 space-y-5 max-w-4xl">
      <div>
        <label className="block mb-2 font-medium">Campaign Name</label>
        <input
          type="text"
          placeholder="Enter campaign name"
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Budget</label>
          <input
            type="number"
            placeholder="₹"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Status</label>
          <select
            className="w-full border rounded-lg px-4 py-2"
            defaultValue=""
          >
            <option value="" disabled>
              Select Status
            </option>
            <option>Draft</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Start Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">End Date</label>
          <input
            type="date"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block mb-2 font-medium">Description</label>
        <textarea
          rows={4}
          placeholder="Campaign description..."
          className="w-full border rounded-lg px-4 py-2"
          required
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-6 py-2 border rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Campaign
        </button>
      </div>
    </form>
  );
}
