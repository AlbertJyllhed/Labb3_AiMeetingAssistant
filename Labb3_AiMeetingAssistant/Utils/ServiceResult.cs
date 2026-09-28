namespace Labb3_AiMeetingAssistant.Utils
{
    public class ServiceResult<T>
    {
        public bool IsSuccess { get; private set; }
        public T? Data { get; private set; }
        public string? ErrorMessage { get; private set; }

        public static ServiceResult<T> Success(T data) => new()
        {
            IsSuccess = true,
            Data = data
        };

        public static ServiceResult<T> Failure(string errorMessage) => new()
        {
            IsSuccess = false,
            ErrorMessage = errorMessage
        };
    }
}
