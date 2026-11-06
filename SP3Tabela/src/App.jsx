import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    const pracownicy = [
        { id: 1, imie: 'Anna', nazwisko: 'Kowalska', dzial: 'IT', pensja: 7200 },
        { id: 2, imie: 'Jan', nazwisko: 'Nowak', dzial: 'Sprzedaż', pensja: 5800 },
        { id: 3, imie: 'Piotr', nazwisko: 'Wiśniewski', dzial: 'IT', pensja: 8500 },
        { id: 4, imie: 'Maria', nazwisko: 'Wójcik', dzial: 'Księgowość', pensja: 6200 },
        { id: 5, imie: 'Tomasz', nazwisko: 'Kowalczyk', dzial: 'IT', pensja: 7900 },
        { id: 6, imie: 'Ewa', nazwisko: 'Kamińska', dzial: 'Sprzedaż', pensja: 5400 },
        { id: 7, imie: 'Adam', nazwisko: 'Lewandowski', dzial: 'Księgowość', pensja: 6800 },
        { id: 8, imie: 'Zofia', nazwisko: 'Zielińska', dzial: 'IT', pensja: 9100 },
        { id: 9, imie: 'Marek', nazwisko: 'Włodarski', dzial: 'Sprzedaż', pensja: 6100 },
        { id: 10, imie: 'Katarzyna', nazwisko: 'Woźniak', dzial: 'IT', pensja: 7500 },
        { id: 11, imie: 'Paweł', nazwisko: 'Dąbrowski', dzial: 'Księgowość', pensja: 6400 },
        { id: 12, imie: 'Alicja', nazwisko: 'Kozłowska', dzial: 'Sprzedaż', pensja: 5700 }
    ];

    const [fraza, setFraza] = useState('');
    const [wybranyDzial, setWybranyDzial] = useState('');

    const filtrujPracownikow = (tekst, dzial) => {
        const szukanyTekst = tekst.trim().toLowerCase();

        return pracownicy.filter(pracownik => {
            const pasujeNazwisko = pracownik.nazwisko
                .toLowerCase()
                .includes(szukanyTekst);

            const pasujeDzial = dzial === '' ||
                pracownik.dzial === dzial;

            return pasujeNazwisko && pasujeDzial;
        });
    };

    const wyniki = filtrujPracownikow(fraza, wybranyDzial);

    const obsluzWyszukiwanie = (e) => {
        const nowaFraza = e.target.value;
        setFraza(nowaFraza);

        const przefiltrowani = filtrujPracownikow(
            nowaFraza,
            wybranyDzial
        );

        console.log(`Wyniki: ${przefiltrowani.length}`);
    };

    const obsluzZmianeDzialu = (e) => {
        const nowyDzial = e.target.value;
        setWybranyDzial(nowyDzial);

        const przefiltrowani = filtrujPracownikow(
            fraza,
            nowyDzial
        );

        console.log(`Wyniki: ${przefiltrowani.length}`);
    };

    return (
        <div className="container mt-4">
            <h2>Pracownicy</h2>

            <div className="mb-3">
                <label htmlFor="szukaj" className="form-label">
                    Szukaj:
                </label>

                <input
                    type="text"
                    className="form-control"
                    id="szukaj"
                    value={fraza}
                    onChange={obsluzWyszukiwanie}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="dzial" className="form-label">
                    Dział:
                </label>

                <select
                    className="form-select"
                    id="dzial"
                    value={wybranyDzial}
                    onChange={obsluzZmianeDzialu}
                >
                    <option value="">Wszystkie</option>
                    <option value="IT">IT</option>
                    <option value="Sprzedaż">Sprzedaż</option>
                    <option value="Księgowość">Księgowość</option>
                </select>
            </div>

            <p>
                Liczba pracowników: {wyniki.length}
            </p>

            {wyniki.length > 0 ? (
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Imię</th>
                            <th scope="col">Nazwisko</th>
                            <th scope="col">Dział</th>
                            <th scope="col">Pensja</th>
                        </tr>
                    </thead>

                    <tbody>
                        {wyniki.map(pracownik => (
                            <tr key={pracownik.id}>
                                <td>{pracownik.imie}</td>
                                <td>{pracownik.nazwisko}</td>
                                <td>{pracownik.dzial}</td>
                                <td>{pracownik.pensja}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning" role="alert">
                    Brak pracowników spełniających kryteria
                </div>
            )}
        </div>
    );
}

export default App;
