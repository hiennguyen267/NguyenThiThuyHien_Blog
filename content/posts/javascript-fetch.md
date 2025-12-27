---
title: "Fetch API trong JavaScript: Hướng dẫn từ A-Z"
date: 2025-12-26
type: "posts"
tags: ["JavaScript", "HTTP", "Frontend", "Promise"]
summary: "Tìm hiểu Fetch API - chuẩn mới thay thế XMLHttpRequest. Hướng dẫn cách gửi request GET, POST, xử lý JSON và Async/Await chi tiết."
---

Trong lập trình web hiện đại, việc giao tiếp với Server (gọi API) là kỹ năng bắt buộc. Trước đây, chúng ta phải "vật lộn" với `XMLHttpRequest` (XHR) và Callback Hell. Ngày nay, **Fetch API** đã ra đời như một vị cứu tinh với cú pháp gọn gàng, mạnh mẽ dựa trên **Promise**.

Dưới đây là hướng dẫn chi tiết về Fetch API dựa trên các kiến thức chuẩn từ TopDev và MDN.

## 1. Fetch API là gì?

**Fetch API** là một công cụ tích hợp sẵn trong trình duyệt (không cần cài thêm thư viện như Axios/jQuery), cho phép JavaScript thực hiện các yêu cầu HTTP (HTTP Requests) để lấy hoặc gửi dữ liệu.

**Tại sao nên dùng Fetch thay vì XMLHttpRequest?**
* **Dễ đọc hơn:** Sử dụng Promise giúp code chạy tuần tự, tránh lồng nhau quá nhiều.
* **Mạnh mẽ hơn:** Hỗ trợ tốt các luồng dữ liệu (Stream) và các tính năng hiện đại của trình duyệt.
* **Không cần thư viện ngoài:** Giúp giảm dung lượng tải trang web.

---

## 2. Cú pháp cơ bản

Cú pháp của Fetch cực kỳ đơn giản:

```javascript
fetch(url, [options])
```
  url: Địa chỉ API

  options: Cấu hình request (method, headers, body...)

**-> Hàm fetch() luôn trả về một Promise.**

## 3. Gửi request GET (Lấy dữ liệu)
```javascript
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => {
    console.log("Danh sách users:", data);
  })
  .catch(error => {
    console.error("Lỗi gọi API:", error);
  });
```
## 4. Gửi request POST (Gửi dữ liệu)
```javascript
const newPost = {
  title: "Học Fetch API",
  body: "Fetch API rất thú vị!",
  userId: 1
};

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=UTF-8"
  },
  body: JSON.stringify(newPost)
})
  .then(response => response.json())
  .then(data => {
    console.log("Tạo bài viết thành công:", data);
  })
  .catch(error => {
    console.error("Lỗi:", error);
  });
```
## 5. Xử lý lỗi HTTP
```javascript
Fetch không tự động báo lỗi khi gặp status 404 hoặc 500, vì vậy cần kiểm tra response.ok.

fetch("https://api.example.com/khong-ton-tai")
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => {
    console.error("Bắt được lỗi:", error);
  });
```
## 6. Sử dụng Async / Await
```javascript
async function getUserData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    if (!response.ok) {
      throw new Error(`Lỗi HTTP: ${response.status}`);
    }

    const user = await response.json();
    console.log("Tên user:", user.name);

  } catch (error) {
    console.error("Có lỗi xảy ra:", error);
  }
}

getUserData();
```
## 7. So sánh Fetch API và Axios

| Tiêu chí                 | Fetch API                                | Axios                                      |
|---------------------------|-----------------------------------------|-------------------------------------------|
| Cài đặt                   | Có sẵn trong trình duyệt hiện đại       | Cần cài đặt qua npm/yarn                  |
| Xử lý JSON                | Phải gọi `.json()` để parse             | Tự động parse JSON sang object JavaScript |
| Hủy request               | Sử dụng `AbortController`               | Sử dụng `CancelToken`                      |
| Hỗ trợ IE cũ              | Không                                   | Có                                        |

## 8. Kết luận

Fetch API là công cụ quan trọng trong JavaScript hiện đại. Việc nắm vững Fetch API giúp lập trình viên làm chủ kỹ năng gọi API, xử lý dữ liệu và xây dựng ứng dụng web hiệu quả.

## Nguồn tham khảo:

- **MDN – Fetch API**  
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

- **TopDev – Fetch API là gì**  
  https://topdev.vn/blog/fetch-api-la-gi/

- **JSONPlaceholder**  
  https://jsonplaceholder.typicode.com/
