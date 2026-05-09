# Notification System Design

## Stage 1: REST API Endpoints
- `GET /notifications` - Fetch top 10 unread notifications (sorted by priority + recency)
- `POST /notifications/:id/read` - Mark notification as read
- `POST /notifications` - Create new notification

## Stage 2: Database Design
Use PostgreSQL with proper indexes on:
- `student_id`, `isRead`, `createdAt`, `priority`

## Stage 3-6: Scalability Improvements
- Added `priority` column (1-100)
- Used Redis for caching top notifications
- Background jobs for email sending
- Rate limiting for high traffic
### Folder structure and results
<img width="364" height="679" alt="Screenshot 2026-05-09 120342" src="https://github.com/user-attachments/assets/5806ccd4-2297-4bb7-9ace-897c3ab49c8f" />
<img width="788" height="303" alt="Screenshot 2026-05-09 120437" src="https://github.com/user-attachments/assets/dfd9769d-6609-4501-a01e-cfd5570506c8" />
<img width="649" height="534" alt="Screenshot 2026-05-09 120414" src="https://github.com/user-attachments/assets/ac8b09f9-7a63-4ee9-9e57-6b97a5a10fe1" />
**Recommended Architecture**: Priority Queue + Materialized Views + Background Workers for handling 50,000+ notifications efficiently.
