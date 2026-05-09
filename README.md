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

**Recommended Architecture**: Priority Queue + Materialized Views + Background Workers for handling 50,000+ notifications efficiently.
