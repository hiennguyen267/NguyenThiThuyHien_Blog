---
title: "Hướng dẫn RESTful Web Service trong Spring Boot"
date: 2025-12-26
type: "posts"
tags: ["Java", "Spring Boot", "REST API", "Backend"]
summary: "Bắt đầu hành trình xây dựng API chuẩn RESTful với Spring Boot. Tìm hiểu các Annotation cơ bản và cách trả về dữ liệu JSON."
---

Trong phát triển Web hiện đại, việc xây dựng các API (Application Programming Interface) để giao tiếp giữa Frontend (React, Vue, Angular) và Backend là điều bắt buộc. **Spring Boot** cung cấp khả năng tạo ra các **RESTful Web Service** cực kỳ nhanh chóng và mạnh mẽ.

Bài viết này được tổng hợp từ **Laptrinhjavaweb**, sẽ hướng dẫn bạn những bước đầu tiên.

## 1. RESTful Web Service là gì?



[Image of REST API Architecture]


Hiểu đơn giản, **RESTful Web Service** là một kiến trúc phần mềm giúp các ứng dụng giao tiếp với nhau qua giao thức HTTP.
* **Dữ liệu:** Thường được trao đổi dưới dạng **JSON** (JavaScript Object Notation).
* **Hoạt động:** Client gửi Request (GET, POST, PUT, DELETE) -> Server xử lý -> Server trả về Response (JSON + HTTP Status Code).

## 2. Cài đặt Dependency

Để làm việc với REST API trong Spring Boot, trong file `pom.xml`, chúng ta cần thêm dependency quan trọng nhất là `spring-boot-starter-web`.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
Thư viện này đã bao gồm sẵn Tomcat (Server để chạy web) và Jackson (Thư viện chuyển đổi Object Java sang JSON và ngược lại).

## 3. Tạo API đầu tiên
Chúng ta sẽ xây dựng một API quản lý bài viết (New).

**Bước 1:** Tạo DTO (Data Transfer Object)
Đây là object dùng để hứng dữ liệu từ Client gửi lên hoặc trả dữ liệu về.
```java
package com.laptrinhjavaweb.dto;

public class NewDTO {
    private String title;
    private String content;

    // Bắt buộc phải có Getter và Setter
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}
```
**Bước 2:** Tạo Controller (API)
Đây là nơi đón nhận các request từ người dùng.

```Java
package com.laptrinhjavaweb.api;

import org.springframework.web.bind.annotation.*;
import com.laptrinhjavaweb.dto.NewDTO;

@RestController // 1. Khai báo đây là RESTful Controller
public class NewAPI {

    // 2. Định nghĩa API thêm bài viết (POST)
    @PostMapping("/new")
    public NewDTO createNew(@RequestBody NewDTO model) {
        // @RequestBody: Map dữ liệu JSON từ Client vào object Java
        return model; // Trả về chính object đó (Spring tự convert sang JSON)
    }
}
```
## 4. Giải thích các Annotation quan trọng
Trong đoạn code trên, có 3 Annotation bạn cần "khắc cốt ghi tâm":

1. **@RestController:**

- Là sự kết hợp của @Controller và @ResponseBody.

- Nó báo cho Spring biết Class này chuyên dùng để viết API.

- Mọi giá trị return của hàm sẽ được trả về dưới dạng JSON (thay vì trả về tên file giao diện HTML/JSP như MVC truyền thống).

2. **@PostMapping("/new"):**

- Định nghĩa phương thức HTTP là POST.

- Đường dẫn truy cập là /new.

- Thường dùng cho chức năng Thêm mới.

3. **@RequestBody:**

- Dùng để lấy dữ liệu từ phần Body của Request (thường là JSON) và map (ánh xạ) vào Object Java (NewDTO).

- Nếu thiếu cái này, dữ liệu gửi lên sẽ bị null.

## 5. Kiểm thử với Postman
Sau khi chạy ứng dụng Spring Boot, bạn mở Postman lên và test như sau:

**URL:** http://localhost:8080/new

**Method:** POST

**Body (raw - JSON):**

```java
{
    "title": "Bài viết số 1",
    "content": "Nội dung bài viết số 1"
}
```
Kết quả mong đợi: Server sẽ trả về đúng cục JSON bạn vừa gửi lên.

## 6. Kết luận
Trong phần 1 này, chúng ta đã làm quen với cách tạo một API đơn giản sử dụng @RestController. Spring Boot đã làm ẩn đi rất nhiều cấu hình phức tạp (như chuyển đổi JSON), giúp chúng ta tập trung vào logic nghiệp vụ.

Ở các phần tiếp theo, chúng ta sẽ tìm hiểu cách kết nối xuống Database và các phương thức PUT (Sửa), DELETE (Xóa).

## Nguồn tham khảo

- **Laptrinhjavaweb – Hướng dẫn RESTful Web Service trong Spring Boot**  
  https://laptrinhjavaweb.com/

- **Spring Boot Documentation – Building a RESTful Web Service**  
  https://spring.io/guides/gs/rest-service/
