import json

paris_recs = []
tags = ['cuisine', 'experience', 'stays']
sources = ['local', 'traveller']
image_urls = {
    'cuisine': ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=600&h=900&q=80'],
    'experience': ['https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=900&q=80'],
    'stays': ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&h=900&q=80', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&h=900&q=80']
}

lat, lng = 48.8566, 2.3522

titles = {
    'cuisine': ['Croissant at The Hidden Bakery', 'Baguette at The Family-run Boulangerie', 'Macarons at The Historic Patisserie', 'Escargot at The Vibrant Bistro', 'Coq au Vin at The Cozy Brasserie', 'Duck Confit at The Legendary Cafe', 'Crepe at The Trendsetting Creperie', 'Onion Soup at The Classic Taverna', 'Steak Frites at The Beloved Restaurant', 'Ratatouille at The Secret Spot'],
    'experience': ['The Iconic Eiffel Tower View', 'The Serene Seine River Walk', 'The Historic Louvre Tour', 'The Vibrant Montmartre Art Walk', 'The Minimalist Hidden Museum', 'The Cozy Jazz Club', 'The Secret Catacombs Entrance', 'The Award-winning Local Market', 'The Bustling Shopping District', 'The Unassuming Art District'],
    'stays': ['Paris Historic City-Center Loft', 'Paris Family-run Boutique Hotel', 'Paris Minimalist Eco-Lodge', 'Paris Iconic Luxury Hotel', 'Paris Secret Bed & Breakfast', 'Paris Cozy Riverside Apartment', 'Paris Trendsetting Coliving Space', 'Paris Award-winning Heritage Guesthouse', 'Paris Bustling Backpacker Hostel', 'Paris Authentic Taverna Stay']
}

for tag in tags:
    for i in range(10):
        paris_recs.append({
            'uniqueId': f'paris-{tag}-{i+1:03d}',
            'city': 'Paris',
            'region': 'Europe',
            'country': 'France',
            'coordinates': { 'lat': lat + (i*0.001), 'lng': lng + (i*0.001) },
            'timezone': 'Europe/Paris',
            'recNumber': i+1,
            'tag': tag,
            'source': sources[i % 2],
            'title': titles[tag][i],
            'description': f'Get off the beaten path with this amazing {tag} spot in Paris. Highly recommended for any itinerary.',
            'photo': image_urls[tag][i % 5]
        })

print("export const PARIS_RECS = " + json.dumps(paris_recs) + ";")
