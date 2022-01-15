
export default function Home() {
    return (
        <div>
            <h2 
                className="text-xl"
            >
                Welcome <span className="text-lime-700">Home</span>
            </h2>
            <p className="mt-6">efficient.ly empowers your decision making about your home.</p>
            <div className="relative top-0 left-0">
                <img className="h-100 relative top-0 left-0" src="https://i.imgur.com/UB2uELH.png" alt="green watercolor splash" />
                <img className="h-100 absolute top-0 left-0" src="https://i.imgur.com/injgadx.png" alt="barn" />
            </div>
            <p className="mt-6">Here you can learn ways to make your home more efficient, save money, and protect the planet.</p>
        </div>
    )
}
