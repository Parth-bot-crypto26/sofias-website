import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const Contact = () => (
  <div className="pt-40 pb-24 px-6 bg-white min-h-screen">
    <div className="container mx-auto max-w-6xl">
       <SectionTitle title="Get in Touch" subtitle="Visit Us" />
       
       <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-12 bg-stone-50 p-12">
            <div className="flex gap-6 items-start">
              <MapPin className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Location</h4>
                <p className="text-stone-600">1035 N Academy Blvd<br/>Colorado Springs, CO 80909</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <Clock className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Hours</h4>
                <div className="text-stone-600 space-y-1 text-sm">
                   <p className="flex gap-4"><span>Mon - Thu:</span> <span>11am - 9pm</span></p>
                   <p className="flex gap-4"><span>Fri - Sat:</span> <span>11am - 10pm</span></p>
                   <p className="flex gap-4"><span>Sunday:</span> <span>12pm - 9pm</span></p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <Phone className="text-red-700 shrink-0" size={28} />
              <div>
                <h4 className="text-xl font-serif text-stone-900 mb-2">Phone</h4>
                <p className="text-stone-600">(719) 555-0199</p>
              </div>
            </div>
          </div>

          <div className="h-[500px] bg-stone-100 w-full overflow-hidden shadow-xl border-4 border-white">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3107.674966601246!2d-104.76015692356567!3d38.84033267173663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x871345cabfd58d2d%3A0x2bf06ce2b1b7374d!2sSofia's%20Antojitos!5e0!3m2!1sen!2sus!4v1714856000000!5m2!1sen!2sus"
               width="100%" 
               height="100%" 
               style={{ border: 0, filter: "grayscale(0%)" }} 
               allowFullScreen="" 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>
       </div>
    </div>
  </div>
);

export default Contact;

