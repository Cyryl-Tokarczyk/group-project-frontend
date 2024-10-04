# Użyj oficjalnego obrazu Node.js jako bazowego
FROM node:16-alpine

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik package.json oraz package-lock.json (jeśli istnieje)
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików projektu
COPY . .

# Zbuduj aplikację
RUN npm run build

# Instalujemy serwer HTTP, np. serve (możesz także użyć nginx)
RUN npm install -g serve

# Otwórz port 80
EXPOSE 80

# Uruchom serwer serve do obsługi aplikacji
CMD ["serve", "-s", "dist", "-l", "80"]
