export const domain = "https://ciistacna.com";

const URI = {
  sessions: domain + "/api/v1/sessions",
  registrations: domain + "/api/v1/registrations",
  attendance: (idEvent, idUser) => domain + `/api/v1/events/${idEvent}/attendance?user=${idUser}`,
  users: domain + "/api/v1/users",
  events: domain + "/api/v1/events",
  speakers: domain + "/api/v1/speakers",
};

export default URI;
