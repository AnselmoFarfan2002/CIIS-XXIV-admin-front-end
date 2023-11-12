export const domain = "https://ciistacna.com";
// export const domain = "http://localhost";

const URI = {
  sessions: domain + "/api/v2/session",
  registrations: domain + "/api/v1/registrations",
  taller: domain + "/api/v2/taller",
  reservation: {
    src: domain + "/api/v2/reservation",
    qr: domain + "/api/v2/reservation/qr",
    one: (id) => ({ src: `${domain}/api/v2/reservation/${id}` }),
  },
  attendance: (idEvent, idUser) => domain + `/api/v1/events/${idEvent}/attendance?user=${idUser}`,
  users: domain + "/api/v1/users",
  events: {
    src: domain + "/api/v1/events",
    one: (id) => ({
      src: `${domain}/api/v2/event/${id}/`,
      reservation: {
        ciis: `${domain}/api/v2/event/${id}/reservation/ciis`,
      },
    }),
  },
};

export default URI;
