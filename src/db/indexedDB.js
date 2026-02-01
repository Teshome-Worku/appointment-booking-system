const DB_NAME = "bookingDB"
const DB_VERSION = 1
const STORE_NAME = "bookings"

export const openDB = () => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION)

            request.onupgradeneeded = (event) => {
                const db = event.target.result

                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: "id" })
                }
            }

            request.onsuccess = () => {
                resolve(request.result)
            }

            request.onerror = () => {
                reject("Error opening database")
            }
        })
    }
    // Function to add a booking to the IndexedDB
export const addBookingToDB = async(booking) => {
        const db = await openDB()

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("bookings", "readwrite")
            const store = transaction.objectStore("bookings")

            const request = store.add(booking)

            request.onsuccess = () => resolve()
            request.onerror = () => reject("Failed to add booking")
        })
    }
    // Function to get all bookings from the IndexedDB
export const getAllBookingsFromDB = async() => {
        const db = await openDB()

        return new Promise((resolve, reject) => {
            const transaction = db.transaction("bookings", "readonly")
            const store = transaction.objectStore("bookings")

            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = () => reject("Failed to fetch bookings")
        })
    }
    // Function to clear all bookings from the IndexedDB
export const deleteBookingFromDB = async(id) => {
    const db = await openDB()

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("bookings", "readwrite")
        const store = transaction.objectStore("bookings")

        const request = store.delete(id)

        request.onsuccess = () => resolve()
        request.onerror = () => reject("Failed to delete booking")
    })
}