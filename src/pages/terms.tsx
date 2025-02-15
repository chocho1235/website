function Terms() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] text-white">
        {/* Header */}
        <header className="fixed w-full z-50 bg-opacity-90 bg-[#0f172a] backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              <button 
                onClick={() => window.location.href = '/'} 
                className="text-white hover:text-blue-400 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => window.location.href = '/contact'} 
                className="px-4 py-2 text-white border border-white rounded-lg hover:bg-white hover:text-[#0f172a] transition-all duration-300"
              >
                Contact
              </button>
            </div>
          </div>
        </header>
  
        {/* Content */}
        <div className="pt-20">
          <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
            
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="text-gray-300">
                  Welcome to EquiLink. These terms and conditions outline the rules and regulations for the use of our services.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
                <p className="text-gray-300">
                  We provide [description of your services]. By accessing or using our services, you agree to be bound by these terms.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Privacy Policy</h2>
                <p className="text-gray-300">
                  Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.
                </p>
              </section>
  
              <section>
                <h2 className="text-2xl font-semibold mb-4">4. User Responsibilities</h2>
                <p className="text-gray-300">
                  Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Terms;