const CategorySelect = ({ selectedCategory, handleChange }) => {
    return(
        <select 
            name="category" 
            className="select select-bordered"
            value={selectedCategory}
            onChange={handleChange}
        >
            <option value="Web, Mobile & Software Dev">Web, Mobile & Software Dev</option>
            <option value="IT & Networking">IT & Networking</option>
            <option value="Data Science & Analytics">Data Science & Analytics</option>
            <option value="Design & Creative">Design & Creative</option>
            <option value="Writing">Writing</option>
            <option value="Translation">Translation</option>
            <option value="Legal">Legal</option>
            <option value="Admin Support">Admin Support</option>
            <option value="Customer Service">Customer Service</option>
            <option value="Sales & Marketing">Sales & Marketing</option>
            <option value="Accounting & Consultant">Accounting & Consultant</option>
            <option value="Other">Other</option>
        </select>
    )
}

export default CategorySelect;